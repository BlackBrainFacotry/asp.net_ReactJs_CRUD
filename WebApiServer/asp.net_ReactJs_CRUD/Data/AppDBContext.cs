using asp.net_ReactJs_CRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace asp.net_ReactJs_CRUD.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Post[] postToSeed = new Post[10];

            for ( int i =1; i <= 10; i++)
            {
                postToSeed[i - 1] = new Post
                {
                    PostId = i ,
                    Title = $"Post {i}",
                    Content = $"Post {i} Content"
                };
            }

            modelBuilder.Entity<Post>().HasData(postToSeed);
       }

    }
}
