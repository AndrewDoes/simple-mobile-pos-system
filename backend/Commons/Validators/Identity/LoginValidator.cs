using Contracts.Requests.Identity;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Commons.Validators.Identity
{
    public class LoginValidator : AbstractValidator<LoginRequest>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("Email must not be empty");
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6).WithMessage("Password must consist at least of 6 characters");
        }
    }
}
