USE SP_MED_GROUP_KEIJI;

--TIPO USUARIO
INSERT INTO TIPOUSUARIO(tipo)
VALUES ('Medico'),('Paciente'),('Administrador');
GO

--SITUACAO
INSERT INTO SITUACAO(descricao)
VALUES ('Agendada'),('Cancelada'),('Realizada')
GO

--ESPECIALIZACAO
INSERT INTO ESPECIALIZACAO(tituloEspecializacao)
VALUES ('Acupuntura'),('Anestesiologia'),('Angiologia'),('Cardiologia'),
       ('Cirurgia Cardiovascular'),('Cirurgia da Mão'),('Cirurgia do Aparelho Digestivo'),('Cirurgia Geral'),('Cirurgia Pediátrica'),
	   ('Cirurgia Plástica'),('Cirurgia Torácica'),('Cirurgia Vascular'),('Dermatologia'),('Radioterapia'),('Urologia'),('Pediatria'),('Psiquiatria')
GO

--INSTITUICAO
INSERT INTO INSTITUICAO(nomeFantasia, razaoSocial, endereco, CNPJ)
VALUES ('Clinica Possarle','SP Medical Group','Av. Barão Limeira, 532, São Paulo, SP','86.400.902/0001-30')
GO

--USUARIO
INSERT INTO USUARIO(idTipoUsuario,nome,email,senha)
VALUES ('2','Ligia','ligia@gmail.com','ligia123'),
	   ('2','Alexandre','alexandre@gmail.com','alexandre223'),
	   ('2','Fernando','fernando@gmail.com','fernando323'),
	   ('2','Henrique','henrique@gmail.com','henrique423'),
	   ('2','Joao','joao@hotmail.com','joao5236'),
	   ('2','Bruno','bruno@gmail.com','bruno623'),
	   ('2','Mariana','mariana@outlook.com','mariana723'),
	   ('1','Ricardo Lemos','ricardo.lemos@spmedicalgroup.com.br','ricardo813'),
	   ('1','Roberto Possarle','roberto.possarle@spmedicalgroup.com.br','roberto913'),
	   ('1','Helena Strada','helena.souza@spmedicalgroup.com.br','helena1013'),
	   ('3','Jeremias','jere@hotmail.com','jere5236')
GO

--MEDICO
INSERT INTO MEDICO(idEspecializacao,idInstituicao,idUsuario,CRM)
VALUES ('2','1','8','54356'),
	   ('17','1','9','53452'),
	   ('16','1','10','65463')
GO


--PACIENTE
INSERT INTO PACIENTE(idUsuario,dataNascimento,CPF,RG,telefone,endereco)
VALUES ('1','13/10/1983','94839859000','435225435','11 34567654','Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
	   ('2','23/7/2001','73556944057','326543457','11 987656543','Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
	   ('3','10/10/1978','16839338002','546365253','11 972084453','Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
	   ('4','13/10/1985','14332654765','543663625','11 34566543','R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
	   ('5','27/08/1975','91305348010','532544441','11 76566377','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
	   ('6','21/03/1972','79799299004','545662667','11 954368769','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
	   ('7','05/03/2018','13771913039','545662668',NULL,'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140')
GO
SELECT * FROM paciente
--TRUNCATE TABLE PACIENTE
--Atualizou os registros que não possuem data de nascimento conforme especificado pelo cliente
UPDATE PACIENTE
   SET dataNascimento = '05/03/2018'
 WHERE idPaciente = 7
    GO

--CONSULTA
INSERT INTO CONSULTA (idMedico,idSituacao,idPaciente,dataConsulta,descricao)
VALUES('3','1','7','20/01/20 15:00','Presencial'),
	('2','2','2','01/06/2020 10:00','Remota'),
	('2','1','3','02/07/2020 11:00','Remota'),
	('2','1','2','02/06/2018 10:00','Remota'),
	('1','2','4','02/07/2019 11:00','Presencial'),
	('2','3','7','03/08/2020 15:00','Remota'),
	('1','3','4','03/09/2020 11:00','Presencial')
GO
--TRUNCATE TABLE CONSULTA
