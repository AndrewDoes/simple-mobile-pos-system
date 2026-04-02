using Contracts.Responses.Identity;
using MediatR;

namespace Contracts.Requests.Identity;

public class RegisterRequest : IRequest<RegisterResponse>
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string ConfirmPassword { get; set; } = string.Empty;
}