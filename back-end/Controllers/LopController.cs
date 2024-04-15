using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Respositories;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LopController : ControllerBase
    {
        private readonly ILopRespositories resp;

        public LopController(ILopRespositories resp)
        {
            this.resp = resp;
        }
        [HttpGet]
        public async Task<ActionResult> all()
        {
            try
            {
                return Ok(await resp.all() );
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> getByMa([FromRoute]int id)
        {
            try
            {
                return Ok( await this.resp.getByMa(id) );
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getWithKhoadk")]
        public async Task<ActionResult> getLopWithKhoaDk()
        {
            try
            {
                return Ok(await this.resp.getLopWithKhoaDk() );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("findid/{dk}/{name}")]
        public async Task<ActionResult> getIdByLop([FromRoute] int dk, [FromRoute] string name)
        {
            try
            {
                return Ok(await this.resp.getIdByName(dk,name) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Post(Lop model)
        {
            try
            {
                return Ok(await resp.post(model));
            }
            catch (Exception ex)
            {
                var str = ex.Message;
                if (ex.InnerException != null)
                {
                    str = ex.InnerException.Message;
                }
                return BadRequest(str);
            }
        }
        [HttpPost("delclasses")]
        public async Task<ActionResult> Del([FromBody]List<Lop> list)
        {
            try
            {
                return Ok(await resp.del(list));

            }
            catch (Exception ex)
            {
                var str = ex.Message;
                if (ex.InnerException != null)
                {
                    str = ex.InnerException.Message;
                }
                return BadRequest(str);
            }
        }
        [HttpPut]
        public async Task<ActionResult> Put(Lop model)
        {
            try
            {
                return Ok(await resp.put(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Del([FromRoute] int id)
        {
            try
            {
                return Ok(await resp.del(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
//{
//    "id": 0,
//  "ten": "string",
//  "ma": "string",
//  "khoaDk": 0
//}