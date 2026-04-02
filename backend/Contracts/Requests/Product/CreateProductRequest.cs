using System;
using System.Collections.Generic;
using System.Text;
using Contracts.Responses.Product;
using MediatR;

namespace Contracts.Requests.Product
{
    public class CreateProductRequest : IRequest<CreateProductResponse>
    {

        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
