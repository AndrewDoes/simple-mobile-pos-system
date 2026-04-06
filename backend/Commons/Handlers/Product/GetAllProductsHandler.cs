using Contracts.Requests.Product;
using Contracts.Responses.Product;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;

namespace Commons.Handlers.Product
{
    public class GetAllProductsHandler : IRequestHandler<GetAllProductsRequest, List<GetProductResponse>>
    {
        private readonly PosDbContext _db;
        private readonly ILogger<GetAllProductsHandler> _logger;

        public GetAllProductsHandler(PosDbContext db, ILogger<GetAllProductsHandler> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<List<GetProductResponse>> Handle(GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Fetching all products from the database...");
            var products = await _db.Products
                .AsNoTracking()
                .Where(p => p.CreatedBy == request.Email)
                .Select(p => new GetProductResponse
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Quantity = p.Quantity
                })
                .ToListAsync();
            Log.Information("Successfully retrieved {Count} products for user {UserEmail}.", products.Count, request.Email);

            return products;
        }
    }
}
