using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Models;
using Webquanlybaithi.Respositories;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LyDoController : ControllerBase
    {
        private readonly ILyDoRespositories _resp;
        public LyDoController(ILyDoRespositories resp)
        {
            _resp = resp;
        }
        [HttpPost]
        public async Task<ActionResult> Post( Lydo model)
        {
            try
            {
                return Ok(await _resp.post(model));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Del(int id)
        {
            try
            {
                return Ok(await _resp.delete(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public async Task<ActionResult> Fix(Lydo model)
        {
            try
            {
                return Ok(await _resp.put(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
