import { Button } from '../ui/button';

// Pagination controls for table navigation
export const Pagination = ({ currentPage, totalPages, startIndex, endIndex, totalItems, onPageChange }) => (
  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
    <div className="text-sm text-gray-600">
      Showing {startIndex + 1} to {endIndex} of {totalItems} payments
    </div>
    <div className="flex gap-2">
      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => (
        <Button
          key={i + 1}
          variant={currentPage === i + 1 ? "default" : "outline"}
          size="sm"
          className="w-8 h-8 p-0"
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      {totalPages > 7 && (
        <>
          <span className="px-2">...</span>
          <Button variant="outline" size="sm" className="w-8 h-8 p-0" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}
    </div>
  </div>
);
