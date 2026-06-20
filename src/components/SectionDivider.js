export default function SectionDivider({ title }) {
  return (
    <div className="my-12">
      <div className="flex items-center justify-center space-x-4">
        <div className="h-px bg-gray-700 flex-1"></div>
        {title && (
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        )}
        <div className="h-px bg-gray-700 flex-1"></div>
      </div>
    </div>
  );
}
