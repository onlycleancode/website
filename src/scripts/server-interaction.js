// Server component interaction handling
// Connects server visualization to popup with related content

// Component metadata
const componentInfo = {
  web: {
    title: 'Web Development',
    description: 'Frontend, backend, and full-stack web projects.',
  },
  switch: {
    title: 'Networking',
    description: 'Networking, protocols, and distributed systems.',
  },
  host: {
    title: 'Systems & OS',
    description: 'Operating systems, low-level programming, and systems engineering.',
  },
  'gpu-ai': {
    title: 'AI/ML & LLMs',
    description: 'Large language models, AI applications, and ML experiments.',
  },
  'gpu-infra': {
    title: 'GPU Infrastructure',
    description: 'Distributed training, MLOps, and GPU cluster management.',
  },
  storage: {
    title: 'Databases & Storage',
    description: 'Database systems, data engineering, and storage solutions.',
  },
  distributed: {
    title: 'Distributed Systems',
    description: 'Distributed computing, system design, and scalable architectures.',
  },
  upcoming: {
    title: 'Work in Progress',
    description: 'Projects currently under active development. Stay tuned for updates.',
  },
};

// Manual project entries (edit this to add your GitHub projects)
const projects = {
  web: [
    // { name: 'My Web App', url: 'https://github.com/yourusername/web-app' },
  ],
  switch: [
    // { name: 'Network Tool', url: 'https://github.com/yourusername/network-tool' },
  ],
  host: [
    // { name: 'OS Project', url: 'https://github.com/yourusername/os-project' },
  ],
  'gpu-ai': [
    // { name: 'LLM Experiment', url: 'https://github.com/yourusername/llm-project' },
  ],
  'gpu-infra': [
    // { name: 'Training Pipeline', url: 'https://github.com/yourusername/training-pipeline' },
  ],
  storage: [
    // { name: 'Database Tool', url: 'https://github.com/yourusername/db-project' },
  ],
  distributed: [
    // { name: 'Distributed System', url: 'https://github.com/yourusername/distributed-system' },
  ],
};

// Favorites - external links to readings, books, articles you've enjoyed
// Add your favorites here! Each entry needs: name, url, and optionally: author, type (book/article/video/paper)
const favorites = {
  web: [
    // { name: 'React Documentation', url: 'https://react.dev', type: 'docs' },
    // { name: 'CSS Tricks', url: 'https://css-tricks.com', author: 'Chris Coyier', type: 'blog' },
  ],
  switch: [
    // { name: 'Beej\'s Guide to Network Programming', url: 'https://beej.us/guide/bgnet/', type: 'book' },
    // { name: 'High Performance Browser Networking', url: 'https://hpbn.co/', author: 'Ilya Grigorik', type: 'book' },
  ],
  host: [
    // { name: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', type: 'book' },
    // { name: 'The Linux Programming Interface', url: 'https://man7.org/tlpi/', author: 'Michael Kerrisk', type: 'book' },
  ],
  'gpu-ai': [
    // { name: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', type: 'paper' },
    // { name: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', author: 'Jay Alammar', type: 'article' },
  ],
  'gpu-infra': [
    // { name: 'PyTorch Distributed Overview', url: 'https://pytorch.org/tutorials/beginner/dist_overview.html', type: 'docs' },
    // { name: 'Efficient Large-Scale Language Model Training', url: 'https://arxiv.org/abs/2104.04473', type: 'paper' },
  ],
  storage: [
    // { name: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', author: 'Martin Kleppmann', type: 'book' },
    // { name: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', type: 'book' },
  ],
  distributed: [
    // { name: 'Designing Distributed Systems', url: 'https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/', author: 'Brendan Burns', type: 'book' },
    // { name: 'The Raft Consensus Algorithm', url: 'https://raft.github.io/', type: 'article' },
  ],
};

// Blog posts data - will be populated at build time
let blogPosts = [];

// Try to get blog posts data if available
if (typeof window !== 'undefined' && window.__BLOG_POSTS__) {
  blogPosts = window.__BLOG_POSTS__;
}

// Tag mapping for components
const tagMapping = {
  web: ['web', 'frontend', 'fullstack', 'react', 'javascript', 'css', 'html', 'nextjs', 'astro'],
  switch: ['networking', 'network', 'protocol', 'tcp', 'http', 'api'],
  host: ['os', 'systems', 'kernel', 'low-level', 'linux', 'unix'],
  'gpu-ai': ['llm', 'ai', 'ml', 'gpt', 'language-model', 'transformer', 'nlp', 'neural'],
  'gpu-infra': ['infrastructure', 'distributed-training', 'mlops', 'gpu-cluster', 'cuda', 'training', 'pytorch'],
  storage: ['database', 'storage', 'data', 'sql', 'nosql', 'redis', 'postgres', 'mongodb'],
  distributed: ['distributed', 'microservices', 'kubernetes', 'docker', 'scalability', 'architecture', 'system-design'],
};

function getRelatedPosts(componentType) {
  const relevantTags = tagMapping[componentType] || [];
  return blogPosts.filter((post) =>
    post.tags.some((tag) =>
      relevantTags.some((relevantTag) => tag.toLowerCase().includes(relevantTag))
    )
  );
}

function showPopup(componentType) {
  const popup = document.getElementById('server-popup');
  const titleEl = document.getElementById('popup-title');
  const projectsList = document.getElementById('projects-list');
  const postsList = document.getElementById('posts-list');
  const favoritesList = document.getElementById('favorites-list');

  if (!popup || !titleEl || !projectsList || !postsList || !favoritesList) return;

  const info = componentInfo[componentType];
  if (!info) return;

  // Set title
  titleEl.textContent = info.title;

  // Populate projects
  const componentProjects = projects[componentType] || [];
  if (componentProjects.length > 0) {
    projectsList.innerHTML = componentProjects
      .map(
        (project) => `
        <li>
          <a href="${project.url}" target="_blank" rel="noopener noreferrer">
            ${project.name} →
          </a>
        </li>
      `
      )
      .join('');
  } else {
    projectsList.innerHTML = '<li class="empty-state">No projects yet. Check back soon!</li>';
  }

  // Populate blog posts
  const relatedPosts = getRelatedPosts(componentType);
  if (relatedPosts.length > 0) {
    postsList.innerHTML = relatedPosts
      .map(
        (post) => `
        <li>
          <a href="${post.url}">
            ${post.title} →
          </a>
        </li>
      `
      )
      .join('');
  } else {
    postsList.innerHTML = '<li class="empty-state">No posts yet. Check back soon!</li>';
  }

  // Populate favorites
  const componentFavorites = favorites[componentType] || [];
  if (componentFavorites.length > 0) {
    favoritesList.innerHTML = componentFavorites
      .map((fav) => {
        // Build the display text with optional author and type
        let displayText = fav.name;
        if (fav.author) {
          displayText += ` <span class="favorite-author">by ${fav.author}</span>`;
        }
        if (fav.type) {
          displayText += ` <span class="favorite-type">${fav.type}</span>`;
        }
        return `
        <li>
          <a href="${fav.url}" target="_blank" rel="noopener noreferrer">
            ${displayText} →
          </a>
        </li>
      `;
      })
      .join('');
  } else {
    favoritesList.innerHTML = '<li class="empty-state">No favorites yet. Check back soon!</li>';
  }

  // Show popup
  popup.classList.add('active');
  popup.setAttribute('aria-hidden', 'false');

  // Focus trap
  const closeBtn = popup.querySelector('.popup-close');
  if (closeBtn) closeBtn.focus();
}

function hidePopup() {
  const popup = document.getElementById('server-popup');
  if (popup) {
    popup.classList.remove('active');
    popup.setAttribute('aria-hidden', 'true');
  }
}

// Initialize event listeners when DOM is ready
function init() {
  // Server component click handlers
  document.querySelectorAll('.server-component').forEach((component) => {
    const handleClick = () => {
      const componentType = component.dataset.component;
      if (componentType) {
        showPopup(componentType);
      }
    };

    component.addEventListener('click', handleClick);
    component.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    });
  });

  // Close popup handlers
  const popup = document.getElementById('server-popup');
  if (popup) {
    // Close button
    const closeBtn = popup.querySelector('.popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', hidePopup);
    }

    // Click outside to close
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        hidePopup();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        hidePopup();
      }
    });
  }
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential module use
export { showPopup, hidePopup, projects, favorites, tagMapping };
