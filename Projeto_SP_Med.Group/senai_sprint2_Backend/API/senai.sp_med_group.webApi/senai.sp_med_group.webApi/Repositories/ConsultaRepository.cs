using Microsoft.EntityFrameworkCore;
using senai.sp_med_group.webApi.Context;
using senai.sp_med_group.webApi.Domains;
using senai.sp_med_group.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.sp_med_group.webApi.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedContext ctx = new SpMedContext();

        public void AlterarDescricao(string descricao, int id)
        {
            Consultum consultaBuscado = BuscarPorId(id);
            if (descricao != null)
            {
                consultaBuscado.Descricao = descricao;
                ctx.Consulta.Update(consultaBuscado);
                ctx.SaveChanges();
            };
        }

        public Consultum BuscarPorId(int id)
        {
            return ctx.Consulta.FirstOrDefault(c => c.IdConsulta == id);
        }

        public void CadastrarConsulta(Consultum novaConsulta)
        {
            novaConsulta.Descricao = "Sem descrição definida";
            novaConsulta.IdSituacao = 1;
            ctx.Consulta.Add(novaConsulta);
            ctx.SaveChanges();
        }

        public void CancelarConsulta(int Id)
        {
            Consultum consultaBuscada = BuscarPorId(Id);
            consultaBuscada.IdSituacao = 2;
            consultaBuscada.Descricao = "Consulta Cancelada";
            ctx.Consulta.Update(consultaBuscada);
            ctx.SaveChanges();
        }

        public List<Consultum> ListarMinhasConsultas(int id, int idTipoUsuario)
        {
            if (idTipoUsuario == 1)
            {
                Medico medico = ctx.Medicos.FirstOrDefault(u => u.IdUsuario == id);

                int idMedico = medico.IdMedico;

                return ctx.Consulta
                                .Where(c => c.IdMedico == idMedico)
                                .Select(p => new Consultum()
                                {
                                    DataConsulta = p.DataConsulta,
                                    IdConsulta = p.IdConsulta,
                                    Descricao = p.Descricao,
                                    IdMedicoNavigation = new Medico()
                                    {
                                        Crm = p.IdMedicoNavigation.Crm,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdMedicoNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdPacienteNavigation = new Paciente()
                                    {
                                        Cpf = p.IdPacienteNavigation.Cpf,
                                        Telefone = p.IdPacienteNavigation.Telefone,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdPacienteNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Descricao = p.IdSituacaoNavigation.Descricao
                                    }


                                })
                                .ToList();
            }
            else if (idTipoUsuario == 2)
            {
                Paciente paciente = ctx.Pacientes.FirstOrDefault(u => u.IdUsuario == id);

                int idPaciente = paciente.IdPaciente;
                return ctx.Consulta
                                .Where(c => c.IdConsulta == idPaciente)
                                .Select(p => new Consultum()
                                {
                                    DataConsulta = p.DataConsulta,
                                    IdConsulta = p.IdConsulta,
                                    Descricao = p.Descricao,
                                    IdMedicoNavigation = new Medico()
                                    {
                                        Crm = p.IdMedicoNavigation.Crm,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdMedicoNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdPacienteNavigation = new Paciente()
                                    {
                                        Cpf = p.IdPacienteNavigation.Cpf,
                                        Telefone = p.IdPacienteNavigation.Telefone,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdPacienteNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Descricao = p.IdSituacaoNavigation.Descricao
                                    }


                                })
                                .ToList();
            }

            return null;

        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta.Select(p => new Consultum()
                                {
                                    DataConsulta = p.DataConsulta,
                                    IdConsulta = p.IdConsulta,
                                    Descricao = p.Descricao,
                                    IdMedicoNavigation = new Medico()
                                    {
                                        Crm = p.IdMedicoNavigation.Crm,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdMedicoNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdMedicoNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdPacienteNavigation = new Paciente()
                                    {
                                        Cpf = p.IdPacienteNavigation.Cpf,
                                        Telefone = p.IdPacienteNavigation.Telefone,
                                        IdUsuarioNavigation = new Usuario()
                                        {
                                            Nome = p.IdPacienteNavigation.IdUsuarioNavigation.Nome,
                                            Email = p.IdPacienteNavigation.IdUsuarioNavigation.Email
                                        }
                                    },
                                    IdSituacaoNavigation = new Situacao()
                                    {
                                        Descricao = p.IdSituacaoNavigation.Descricao
                                    }
                                })
                                .ToList();
        }

        public void RemoverConsulta(int id)
        {
            ctx.Consulta.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }
    }
}
