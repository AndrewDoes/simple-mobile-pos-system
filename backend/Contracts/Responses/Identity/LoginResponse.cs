using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts.Responses.Identity
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime Expiry { get; set; }
    }
}
