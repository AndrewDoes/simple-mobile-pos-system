using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Entities.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace Commons.Handlers.Product
{
    public class CreateProductHandler : IRequestHandler<CreateProductRequest, CreateProductResponse>
    {
        private readonly PosDbContext _db;
        private readonly ILogger<CreateProductHandler> _logger;
        private readonly IHttpContextAccessor _httpContextAccessor; 
        
        public CreateProductHandler(PosDbContext db, ILogger<CreateProductHandler> logger, IHttpContextAccessor httpContextAccessor)
        {
            _db = db;
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<CreateProductResponse> Handle(CreateProductRequest request, CancellationToken cancellationToken)
        {
            // Get the email of the user making the request
            var userEmail = _httpContextAccessor.HttpContext?.User?.Identity?.Name ?? "System";
            string logMessage = "Adding product\nName: " + request.Name + "\nPrice: " + request.Price + "\nQuantity: " + request.Quantity;
            _logger.LogInformation(logMessage);
            var product = new ProductModel
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Price = request.Price,
                Quantity = request.Quantity,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = userEmail
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();
            logMessage = "Added product successful\nId: " + product.Id + "Name: " + product.Name + "\nPrice: " + product.Price + "\nQuantity: " + product.Quantity;
            _logger.LogInformation(logMessage);
            return new CreateProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Quantity = product.Quantity,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = userEmail
            };
        }
    }
}
