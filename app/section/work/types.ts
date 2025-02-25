export interface WorkDetail {
  title: string;
  type: string;
  subtitle: string;
  image: string;
  tags: string[];
  about: {
    title: string;
    desc: string;
    images: string[];
    keyfeatures: string[];
    responsibility: string[];
  };
}
