import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import './Formulario.css';
//import axios from 'axios';

export const MapaDaJuntaForm = () => {
  // Usamos esse hook useState para criar variaveis que vao guardar dados nos formularios
  const [formData, setFormData] = useState({
    entidadeQueEnvia: '',
    nome: '',
    bi: '',
    naturalidade: '',
    dataNascimento: '',
    localTrabalho: '',
    profissao: '',
    licencaData: '',
    homologacaoData: '',
    lesao: '',
    funcaoAlterada: '',
    antiguidade: '',
    contratacao: '',
    presidente: '',
    vogal1: '',
    vogal2: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('Vamos colocar a nossa API aqui');
        setFormData(response.data); 
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };


 const loadImage = () => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = '/emblema.jpeg';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);
      resolve(canvas.toDataURL('image/jpeg')); 
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};



  // Essa funcao vai gerar o pdf, usando a biblioteca jsPDF
  //usamos doc.text para adicionar os conteudos dos inputs no pdf
  //usamos doc.save para baixar o pdf
  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(12); 

    const imgData = await loadImage(); // Carregar a imagem

    // Adicionar a imagem ao PDF
    doc.addImage(imgData, 'JPEG', 10, 10, 50, 50); // Adicionando a imagem ao PDF, na posição (10, 10) e tamanho (50x50)

    doc.text('Mapa da Junta', 80, 10);
    doc.text(`Em sessão de (Data): ${formData.sessao}`, 20, 20);
    doc.text(`Entidade que envia: ${formData.entidadeQueEnvia}`, 20, 30);
    doc.text(`Nome: ${formData.nome}`, 20, 40);
    doc.text(`B.I. (Nº Arq. Data): ${formData.bi}`, 20, 50);
    doc.text(`Naturalidade: ${formData.naturalidade}`, 20, 60);
    doc.text(`Data de Nascimento: ${formData.dataNascimento}`, 20, 70);
    doc.text(`Local de Trabalho: ${formData.localTrabalho}`, 20, 80);
    doc.text(`Profissão: ${formData.profissao}`, 20, 90);
    doc.text(`Licença da Junta (Data): ${formData.licencaData}`, 20, 100);
    doc.text(`Homologação (Data): ${formData.homologacaoData}`, 20, 110);
    doc.text(`Lesão e número correspondente: ${formData.lesao}`, 20, 120);
    doc.text(`Funções alteradas e em que grau: ${formData.funcaoAlterada}`, 20, 130);
    doc.text(`Antiguidade da lesão: ${formData.antiguidade}`, 20, 140);
    doc.text(`Se foi contraído em serviço: ${formData.contratacao}`, 20, 150);
    doc.text(`O Presidente: ${formData.presidente}`, 20, 160);
    doc.text(`1º Vogal: ${formData.vogal1}`, 20, 170);
    doc.text(`2º Vogal: ${formData.vogal2}`, 20, 180);

    doc.save('MapaDaJunta.pdf');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Mapa da Junta</h1>
        <label>
          Em sessão de (Data):
          <input type="date" name="sessao" value={formData.sessao} onChange={handleChange} />
        </label>
      </div>
      
      <label>
        Entidade que envia:
        <input type="text" name="entidadeQueEnvia" value={formData.entidadeQueEnvia} onChange={handleChange} />
      </label>
      
      <label>
        Nome:
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
      </label>
      
      <label>
        B.I. (Nº Arq. Data):
        <input type="text" name="bi" value={formData.bi} onChange={handleChange} />
      </label>
      
      <label>
        Naturalidade:
        <input type="text" name="naturalidade" value={formData.naturalidade} onChange={handleChange} />
      </label>
      
      <label>
        Data de Nascimento:
        <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
      </label>
      
      <label>
        Local de Trabalho:
        <input type="text" name="localTrabalho" value={formData.localTrabalho} onChange={handleChange} />
      </label>
      
      <label>
        Profissão:
        <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} />
      </label>
      
      <div className="form-group">
        <label>
          Licença da Junta (Data):
          <input type="date" name="licencaData" value={formData.licencaData} onChange={handleChange} />
        </label>
        
        <label>
          Homologação (Data):
          <input type="date" name="homologacaoData" value={formData.homologacaoData} onChange={handleChange} />
        </label>
      </div>
      
      <label>
        Lesão e número correspondente da tabela:
        <textarea name="lesao" value={formData.lesao} onChange={handleChange} />
      </label>
      
      <label>
        Funções alteradas e em que grau:
        <textarea name="funcaoAlterada" value={formData.funcaoAlterada} onChange={handleChange} />
      </label>
      
      <label>
        Antiguidade da lesão:
        <textarea name="antiguidade" value={formData.antiguidade} onChange={handleChange} />
      </label>
      
      <label>
        Se foi contraído em serviço e por efeito do mesmo:
        <textarea name="contratacao" value={formData.contratacao} onChange={handleChange} />
      </label>
      
      <label>
        O Presidente:
        <input type="text" name="presidente" value={formData.presidente} onChange={handleChange} />
      </label>
      
      <label>
        1º Vogal:
        <input type="text" name="vogal1" value={formData.vogal1} onChange={handleChange} />
      </label>
      
      <label>
        2º Vogal:
        <input type="text" name="vogal2" value={formData.vogal2} onChange={handleChange} />
      </label>
      
      <button type="button" onClick={generatePDF}>Baixar PDF</button>
    </form>
  );
}
