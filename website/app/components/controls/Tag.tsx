interface TagProps {
  label: string;
  href?: string;
}

const Tag = ({ label, href }: TagProps) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full`}
    >
      {href ? <a href={href}>{label}</a> : label}
    </span>
  );
};

export default Tag;
