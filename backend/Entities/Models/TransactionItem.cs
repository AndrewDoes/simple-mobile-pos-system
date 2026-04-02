namespace Entities.Models
{
    public class TransactionItem
    {
        public Guid Id { get; set; }

        public Guid ProductId { get; set; }
        public required ProductModel Product { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; } // price at time of purchase
    }
}