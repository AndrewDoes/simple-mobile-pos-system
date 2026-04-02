using Contracts.Responses.Product;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts.Requests.Product
{
    public class GetAllProductsRequest : IRequest<List<GetProductResponse>>
    {

    }
}
