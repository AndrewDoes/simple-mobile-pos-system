using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public class PosDbContext : IdentityDbContext
{
    public PosDbContext(DbContextOptions<PosDbContext> options)
    : base(options)
    {
    }

    public DbSet<ProductModel> Products => Set<ProductModel>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<TransactionItem> TransactionItems => Set<TransactionItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Fix for Product Price
        modelBuilder.Entity<ProductModel>()
            .Property(p => p.Price)
            .HasPrecision(18, 2);

        // Fix for Transaction Total
        modelBuilder.Entity<Transaction>()
            .Property(t => t.TotalAmount)
            .HasPrecision(18, 2);

        // Fix for TransactionItem Price
        modelBuilder.Entity<TransactionItem>()
            .Property(ti => ti.Price)
            .HasPrecision(18, 2);
    }
}