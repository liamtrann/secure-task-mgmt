import { Button, Heading } from './common';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-6">
      <Heading title="Filter by Category" />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onSelectCategory('all')}
          title="All"
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
        />
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onSelectCategory(category)}
            title={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
          />
        ))}
      </div>
    </div>
  );
};
