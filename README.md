![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/gabrielcastroo/pi2a/python-publish.yml)

# Projeto Natação Olímpica

## Cronograma

[Acessar Cronograma](https://hungry-clover-71f.notion.site/Cronograma-do-PI-a940a96cfe0f4156ad95f048c1000920)

## Layout (Figma)

[Acessar figma](https://www.figma.com/file/XGms63iHMtclEYLN2IIKhe/Natação-Olímpica?type=design&node-id=0-1&mode=design&t=k2CIAC8w9sMWvsDe-0)

## Link para documentação da API em execução na aws

[Acessar Documentação](http://ec2-44-201-200-110.compute-1.amazonaws.com/docs)

## Requisitos

Antes de começar, certifique-se de que você tem os seguintes requisitos instalados:

- Python 3.8 ou superior
- pip (gerenciador de pacotes do Python)

## Tecnologias utilizadas

- Fast API
- Postgres
- HTML
- CSS
- Javascript
- NginX 
- instancia Ubuntu 20.04 AWS

## Instalação em seu ambiente local

1. Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/gabrielcastroo/pi2a.git
```

2. Navegue até o diretório do projeto:

```bash
cd pi2a
```

3. Crie e ative um ambiente virtual (opcional, mas altamente recomendado):

```bash
python3 -m venv venv
source venv/bin/activate
```

4. Instale as dependências do projeto:

```bash
pip install -r src/requirements.txt
```

## Executando o projeto

Após a instalação, você pode iniciar o servidor de desenvolvimento executando o seguinte comando:

```bash
uvicorn src.server:app --reload
```

Isso iniciará o servidor de desenvolvimento em `http://localhost:8000`. Você pode acessar a documentação interativa da API em `http://localhost:8000/docs`.


