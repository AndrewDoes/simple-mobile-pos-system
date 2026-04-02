using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal TotalAmount { get; set; }

        public List<TransactionItem> Items { get; set; } = new();
    }
}
