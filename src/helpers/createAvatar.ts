const AvatarTypes = [
  'avataaars',
  'bottts',
  'micah',
  'human',
  'pixel-art',
  'croodles',
];

function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * AvatarTypes.length);
  return AvatarTypes[randomIndex];
}

export function createAvatar(name: string) {
  const avatar = `https://avatars.dicebear.com/api/${getRandomAvatar()}/${name.replace(
    /\s/g,
    ''
  )}.svg`;
  return avatar;
}
