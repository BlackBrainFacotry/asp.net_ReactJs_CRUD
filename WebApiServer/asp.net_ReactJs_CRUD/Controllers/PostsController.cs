using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using asp.net_ReactJs_CRUD.Data;
using asp.net_ReactJs_CRUD.Models;

namespace asp.net_ReactJs_CRUD.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDBContext _context;

        public PostsController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/GetAllPosts
        [HttpGet]
        public async Task<List<Post>> GetAllPosts()
        {
           List<Post> ret= await _context.Posts.ToListAsync();
            return ret;
        }



        // GET: api/Posts/5
        [HttpGet("{id}")]
        
        public async Task<ActionResult<Post>> GetPostById(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        [HttpPost("{title}")]
        public async Task<List<Post>> GetPostByTitle(string title)
        {
            
            var post = await _context.Posts.Where( e => e.Title == title).ToListAsync();

            return post;
        }

        // PUT: api/Posts/5
        [HttpPut]
        public async Task<bool> UpdatePost( Post postToUpdate)
        {
           Post oldPost = await _context.Posts.FindAsync(postToUpdate.PostId);
            if(oldPost != null)
            {
                try
                {
                    oldPost.Title=postToUpdate.Title;
                    oldPost.Content=postToUpdate.Content;
                    
                }
                catch(Exception ex)
                {
                    return false;
                }
            }

            return await _context.SaveChangesAsync() >= 1;
        }

        // POST: api/Posts
        [HttpPost]
        public async Task<bool> AddPost(Post post)
        {
          if (_context.Posts == null)
          {
              return false;
          }
            _context.Posts.Add(post);
            

            return await _context.SaveChangesAsync() >=1 ;
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            if (_context.Posts == null)
            {
                return NotFound();
            }
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            renamePostsId();
            return NoContent();
        }

        private bool PostExists(int id)
        {
            return (_context.Posts?.Any(e => e.PostId == id)).GetValueOrDefault();
        }

        private bool renamePostsId()
        {
            int newPostId = 1;
            foreach(var post in _context.Posts)
            {
                post.PostId = newPostId;
                newPostId++;
                _context.Posts.Update(post);
            }

            return _context.SaveChanges() >= 1;
        }
    }
}
