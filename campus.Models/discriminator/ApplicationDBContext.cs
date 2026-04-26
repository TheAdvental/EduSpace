using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models.interfaces;
using Models;

namespace campus.Models.Discriminator;

public class ApplicationDBContext : IdentityDbContext<Entity>
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Entity>()

            .HasDiscriminator<string>("UserType")
            .HasValue<Student>("Student")
            .HasValue<Teacher>("Teacher");
    }
}






