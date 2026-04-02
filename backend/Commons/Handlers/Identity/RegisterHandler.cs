using Contracts.Requests.Identity;
using Contracts.Responses.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Serilog;

public class RegisterHandler : IRequestHandler<RegisterRequest, RegisterResponse>
{
    private readonly UserManager<IdentityUser> _userManager;

    public RegisterHandler(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<RegisterResponse> Handle(RegisterRequest request, CancellationToken cancellationToken)
    {
        var existingUser = await _userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
        {
            return new RegisterResponse
            {
                IsSuccess = false,
                Message = "User already exists."
            };
        }

        var user = new IdentityUser { UserName = request.Email, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);

        if (result.Succeeded)
        {
            Log.Information("User {Email} registered.", request.Email);
            return new RegisterResponse
            {
                IsSuccess = true,
                Message = "Registration successful!",
                UserId = user.Id
            };
        }

        // Combine Identity errors into one message for the frontend
        var errorMsg = string.Join(", ", result.Errors.Select(e => e.Description));
        return new RegisterResponse
        {
            IsSuccess = false,
            Message = errorMsg
        };
    }
}