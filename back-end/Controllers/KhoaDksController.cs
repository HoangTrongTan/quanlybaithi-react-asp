using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Webquanlybaithi.Entities;
using Webquanlybaithi.Respositories;

namespace Webquanlybaithi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhoaDksController : ControllerBase
    {
        private readonly IKhoaDKRespositories khoaDksRepo;
        public KhoaDksController(IKhoaDKRespositories repo)
        {
            khoaDksRepo = repo;
        }
        [HttpGet] 
        public async Task<IActionResult> All()
        {
            try
            {
                return Ok(await khoaDksRepo.getAll());
            }catch (Exception ex)
            {
                return BadRequest(ex.Message); 
            }
        }
        [HttpGet("{ma}")]
        public async Task<ActionResult> findByMa([FromRoute] string ma)
        {
            try
            {
                return Ok(await khoaDksRepo.getkHOAbyMa(ma) );
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("fintid/{loai}/{ma}")]
        public async Task<ActionResult> findByName([FromRoute] int loai, [FromRoute]string ma)
        {
            try
            {
                return Ok( await khoaDksRepo.getIdByLoai(loai,ma) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<ActionResult> Post(KhoaDk model)
        {
            try
            {
                return Ok(await khoaDksRepo.post(model) );
            }
            catch (Exception ex)
            {
                var str = ex.Message;
                if (ex.InnerException != null)
                {
                    str =  ex.InnerException.Message;
                }
                return BadRequest(str);
            }
        }
        [HttpPut]
        public async Task<ActionResult> Put(KhoaDk model)
        {
            try
            {
                return Ok(await khoaDksRepo.put(model) );
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
                return Ok(await khoaDksRepo.del(id) );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("del-khoa-dk-file")]
        public async Task<ActionResult> Del([FromBody]List<KhoaDk> list)
        {
            try
            {
                return Ok(await khoaDksRepo.delfile(list));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("del-khoa-dk-lop")]
        public async Task<ActionResult> DelLop([FromBody] List<KhoaDk> list)
        {
            try
            {
                return Ok(await khoaDksRepo.delLop(list));
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
//  "loai": 0,
//  "ma": "string"
//}