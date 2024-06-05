---
scope: kit
---

# Builds et déploiements

## Build

Pour build votre application, il vous suffit de lancer la commande `npm run build`.

```bash
npm run build # pour générer votre build de production
```

Une fois le build généré, vous pouvez prévisualiser votre application de production avec `npm run
preview`.

```bash
npm run preview # pour visualiser votre application de production en local
```

> Ne pas utiliser `npm run preview` pour lancer votre application "pour de vrai". Cette commande est
> uniquement prévue pour fonctionner sur un environnement local.

## Adaptateurs

Pour préparer au mieux votre build de production, vous devez _adapter_ votre application. Cela se
fait en installant un adaptateur...

```bash
npm i -D @sveltejs/adapter-xxx # à modifier selon l'adaptateur choisi
```

... puis en le précisant dans votre configuration Svelte :

```ts
// svelte.config.ts
import adapter from '@sveltejs/adapter-xxx';

export default { kit: { adapter: adapter() } };
```

### `auto`

Capable de détecter la plupart des environnement de déploiement automatiquement, d'installer et
d'utiliser l'adaptateur adéquat lors du déploiement.

C'est l'adaptateur installé par défaut.

Pratique pour démarrer, car ne nécessite pas de configuration particulière. Néanmoins, il est plutôt
recommandé d'utiliser l'adaptateur prévu pour votre plateforme cible.

### `static`

```bash
npm i -D @sveltejs/adapter-static
```

Si vous avez besoin de prérendre toute votre application – et donc faire du SSG –, vous pouvez
utiliser l'adaptateur `static` plutôt que d'utiliser les options de page sur chaque page.

### `node`

Probablement le plus courant.

```bash
npm i -D @sveltejs/adapter-node
```

Une fois votre build généré avec l'adaptateur `node`, vous pouvez déployer votre application en
production.

Pour cela, vous avez besoin :

- du dossier de build généré, par défaut `build`
- du fichier `package.json`
- du dossier de dépendances `node_modules`
- de vos éventuelles variables d'environnement

> Vous pouvez générer un `node_modules` ne contenant que vos dépendances de production avec la
> commande `npm ci --omit dev`. Cela permet d'améliorer votre temps d'installation, et d'alléger le
> poids du dossier `node_modules`.

> Nous n'avons pas couvert le sujet des variables d'environnement. Vous pouvez en apprendre plus
> [ici](https://kit.svelte.dev/docs/adapter-node#environment-variables) et
> [là](https://kit.svelte.dev/docs/adapter-node#environment-variables).

### Autres

Pour déployer sur Vercel, Cloudflare, etc.

---

En apprendre plus sur ce sujet

- [Build](https://kit.svelte.dev/docs/building-your-app)
- [Adaptateurs](https://kit.svelte.dev/docs/adapters)
- [Serveurs Node](https://kit.svelte.dev/docs/adapter-node)
