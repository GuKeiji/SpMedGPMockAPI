using senai.sp_med_group.webApi.Context;
using senai.sp_med_group.webApi.Domains;
using senai.sp_med_group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.sp_med_group.webApi.Repositories
{
    public class MedicoRepository : IMedicoRepository
    {
        SpMedContext ctx = new SpMedContext();
        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.Select(p => new Medico()
            {
                IdMedico = p.IdMedico,
                IdEspecializacao = p.IdEspecializacao,
                IdInstituicao = p.IdInstituicao,
                IdUsuario = p.IdUsuario,
                Crm = p.Crm,
                IdUsuarioNavigation = new Usuario()
                {
                    Nome = p.IdUsuarioNavigation.Nome
                }
            }).ToList();
        }
        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }
    }
}
