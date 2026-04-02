using Contracts.Requests.Product;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.ComponentModel.DataAnnotations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/v1/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IValidator<CreateProductRequest> validator;

        public ProductController(IMediator mediator, IValidator<CreateProductRequest> validator)
        {
            this._mediator = mediator;
            this.validator = validator;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateProductRequest request)
        {
            var validationResult = await validator.ValidateAsync(request);

            if (!validationResult.IsValid)
            {
                // Log each validation error specifically
                foreach (var error in validationResult.Errors)
                {
                    Log.Warning("Validation failed for {PropertyName}: {ErrorMessage}. Value attempted: {AttemptedValue}",
                        error.PropertyName,
                        error.ErrorMessage,
                        error.AttemptedValue);
                }

                return BadRequest(validationResult.Errors.Select(e => new { e.PropertyName, e.ErrorMessage }));
            }

            var response = await _mediator.Send(request);
            return Ok(response);
        }

        [Authorize]
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var response = await _mediator.Send(new GetAllProductsRequest());
            Log.Information("Inventory list retrieved by {User}", User.Identity?.Name);
            return Ok(response);
        }
    }
}
