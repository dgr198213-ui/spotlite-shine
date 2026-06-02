# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Escénika!

## 📋 Prerequisitos

- Node.js 22.13.0+
- Git
- Conocimiento básico de React, TypeScript y TanStack

## 🔄 Flujo de Trabajo

### 1. Fork y Clonar

```bash
git clone https://github.com/TU_USUARIO/spotlite-shine.git
cd spotlite-shine
git remote add upstream https://github.com/dgr198213-ui/spotlite-shine.git
```

### 2. Crear rama

```bash
git fetch upstream
git checkout main
git merge upstream/main
git checkout -b feature/descripcion
```

### 3. Cambios y Commits

Sigue [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(scope): descripción"
git commit -m "fix(components): descripción"
git commit -m "docs: descripción"
```

### 4. Push y Pull Request

```bash
git push origin feature/descripcion
```

En GitHub:
- Título descriptivo
- Descripción clara
- Enlaza issues relacionados

## ✅ Checklist

- [ ] Tests escritos y pasando
- [ ] Código linteado (`npm run lint`)
- [ ] Types válidos (`npm run type-check`)
- [ ] Commits siguiendo Conventional Commits
- [ ] PR description clara

## 💻 Guía de Código

### Componentes

```typescript
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  onClick?: () => void;
}

export const MyComponent: FC<Props> = ({ title, onClick }) => {
  return (
    <div className={cn('p-4')}>
      <h1>{title}</h1>
      {onClick && <button onClick={onClick}>Click</button>}
    </div>
  );
};
```

### TypeScript
- Siempre especifica tipos
- Evita `any`
- Usa interfaces para props

### Estilos
- Usa Tailwind CSS
- Prefiere utility classes
- Usa `cn()` para clases condicionales

---

¡Gracias por contribuir! 🙏
