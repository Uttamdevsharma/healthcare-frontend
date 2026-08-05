let profilePhotoVersion = Date.now();

const listeners = new Set<() => void>();

export const bumpProfilePhotoVersion = () => {
  profilePhotoVersion += 1;
  listeners.forEach((listener) => listener());
};

export const subscribeProfilePhotoVersion = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getProfilePhotoVersion = () => profilePhotoVersion;

export const getProfileImageSrc = (photo?: string | null, bustKey?: string | number) => {
  if (!photo) {
    return "";
  }
  try {
    const url = new URL(photo);
    if (!["http:", "https:", "data:"].includes(url.protocol)) {
      return "";
    }
    if (url.protocol === "data:") {
      return photo;
    }
  } catch {
    return "";
  }
  if (bustKey === undefined) {
    return photo;
  }
  const separator = photo.includes("?") ? "&" : "?";
  return `${photo}${separator}v=${encodeURIComponent(String(bustKey))}`;
};
