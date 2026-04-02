namespace Contracts.Responses.Identity;

public class RegisterResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? UserId { get; set; }
}