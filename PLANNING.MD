# Waner-On Life Insurance Pricing

**Produto:** Seguro de Vida
**Motivador:** Precisa ser mais dinâmico na parte de coberturas, permitindo que o cliente escolha quais coberturas quer ter e ter uma precificação mais precisa levando em consideração a idade, ocupação e localização do individuo.

- Utilização do NodeJS na versão LTS.
- Implementação do código em Typescript.
- Docker compose para subir toda a solução.
- Roles ADMIN e USER.
- Autenticação com chave assíncrona, JWT.
- Pricing API conhece a chave publica para abrir os tokens e validar.
- Testes com comando `docker compose up`
- Banco de dados separados

### Prioridade
1. Identity Api
2. Pricing Api
3. Gerais
4. Docker
5. Extra
  
### Gerais
  - [x] Arquivo `ARCHITECTURE.md` na pasta `/docs`
  - [x] Compartilhar com `github.com/rcalabro`.

### Identity API
  - [x] Arquivo `credentials.json`.
  - [x] Inserir usuários do arquivo `credentials.json`.
  - [x] Insomnia da api.
  - [x] Gerar report de cobertura de testes `lcov`.
  - [x] [US-1](./docs/user-stories/identity-api/us-1-user-registration.md)
  - [x] [US-2](./docs/user-stories/identity-api/us-2-change-user-role.md)
  - [x] [US-3](./docs/user-stories/identity-api/us-3-user-login.md)

### Pricing API
  - [x] Inserir dados localizados na pasta `seed`.
  - [x] Gerar report de cobertura de testes `lcov`.
  - [x] Insomnia da api.
  - [x] Duas instancias com `NGINX` na porta `3000`.
  - [x] [US-4](./docs/user-stories/pricing-api-admin/us-4-create-coverage.md)
  - [x] [US-5](./docs/user-stories/pricing-api-admin/us-5-edit-coverage.md)
  - [x] [US-6](./docs/user-stories/pricing-api-admin/us-6-remove-coverage.md)
  - [x] [US-7](./docs/user-stories/pricing-api-user/us-7-dynamic-pricing.md)
  
### Docker
- [x] Imagens
- [x] NGINX
- [x] Limitar recursos

### Extras
  - [x] Testes e2e - parcial
  - [ ] Organização dos LOGs
  - [ ] Otimização de performance
  - [ ] Otimização de recursos utilizados (CPU e Memória)
  - [ ] Algo inesperado