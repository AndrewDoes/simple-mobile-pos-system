using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Contracts.Requests.Identity;
using Contracts.Responses.Identity;
using Serilog;

namespace Commons.Handlers.Identity;

public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _configuration;

    public LoginHandler(UserManager<IdentityUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
    {
        Log.Information("Login attempt for user: {Email}", request.Email);

        // 1. Find user by email
        var user = await _userManager.FindByEmailAsync(request.Email);

        // 2. Check password
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
        {
            Log.Warning("Invalid login attempt for {Email}", request.Email);
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        // 3. Create Claims (the "ID card" info inside the token)
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName!),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        // 4. Generate the Signing Key from User Secrets
        var jwtKey = _configuration["Jwt:Key"] ?? "THIS_IS_A_TEMPORARY_DEVELOPMENT_KEY_32_CHARS_LONG";
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

        // 5. Create the Token
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            expires: DateTime.Now.AddHours(8), // Shift-length expiry for POS
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        Log.Information("User {Email} logged in. Token expires at {Expiry}", user.Email, token.ValidTo);

        return new LoginResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Email = user.Email!,
            Expiry = token.ValidTo
        };
    }
}