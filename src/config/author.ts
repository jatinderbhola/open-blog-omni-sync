interface AvatarConfig {
    type: 'custom' | 'generated';
    customPath?: string;
    style?: 'initials' | 'avataaars' | 'bottts' | 'pixel-art' | 'identicon';
}

export const AUTHOR_CONFIG = {
    name: 'Jatinder (Jay) Bhola',
    email: 'jatinderbhola@gmail.com',
    website: 'https://jatinderbhola.com',
    github: 'https://github.com/jatinderbhola',
    linkedin: 'https://www.linkedin.com/in/jatinderbhola',
    bio: 'Software Engineer Tech Lead @ SSENSE | Application Development Manager | Tech Lead | Building Scalable Systems | Cloud-Native & Event-Driven Architectures',
    location: 'Toronto, Canada',
    avatar: {
        type: 'generated',
        style: 'pixel-art',
    } as AvatarConfig,
    social: {
        github: 'jatinderbhola',
        linkedin: 'jatinderbhola',
        twitter: 'jatinder_bhola',
    },
} as const; 