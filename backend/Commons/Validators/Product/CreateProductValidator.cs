using Contracts.Requests.Product;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Commons.Validators.Product
{
    public class CreateProductValidator : AbstractValidator<CreateProductRequest>
    {
        private readonly PosDbContext _db;
        private readonly ILogger<CreateProductValidator> _logger;

        public CreateProductValidator(PosDbContext db, ILogger<CreateProductValidator> logger)
        {
            _db = db;
            _logger = logger;
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Product name is required.")
                .MaximumLength(100).WithMessage("Product name must not exceed 100 characters.")
                .MustAsync(BeUniqueName).WithMessage("Product name must be unique.");
            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than zero.");
            RuleFor(x => x.Quantity)
                .GreaterThanOrEqualTo(0).WithMessage("Quantity cannot be negative.");
        }

        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            // Check if any product in the DB already has this name (case-insensitive)
            var exists = await _db.Products
                .AnyAsync(p => p.Name.ToLower() == name.ToLower(), cancellationToken);

            return !exists;
        }
    }
}
