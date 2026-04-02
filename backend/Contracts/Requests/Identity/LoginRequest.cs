using Contracts.Responses.Identity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts.Requests.Identity
{
    public class LoginRequest:IRequest<LoginResponse>
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
