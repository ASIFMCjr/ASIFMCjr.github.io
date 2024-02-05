import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';

type paginationProps = { pages: number, current_page: number, sibling_count?: number }

const usePagination = ({ pages, sibling_count = 2, current_page, DOTS }: paginationProps & {DOTS: number}) => {

    const paginationRange = useMemo(() => {
        const range = (start: number, end: number) => {
            const length = end - start + 1;
            return Array.from({ length }, (_, idx) => idx + start);
          };
        
      const totalPageNumbers = sibling_count + 5;
  
      if (totalPageNumbers >= pages) {
        return range(1, pages);
      }
      
      const leftSiblingIndex = Math.max(current_page - sibling_count, 1);
      const rightSiblingIndex = Math.min(
        current_page + sibling_count,
        pages
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < pages - 2;
  
      const firstPageIndex = 1;
      const lastPageIndex = pages;
  
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * sibling_count;
        const leftRange = range(1, leftItemCount);
  
        return [...leftRange, DOTS, pages];
      }
  
      if (shouldShowLeftDots && !shouldShowRightDots) {
        
        const rightItemCount = 3 + 2 * sibling_count;
        const rightRange = range(
          pages - rightItemCount + 1,
          pages
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }
       
      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [pages, sibling_count, current_page]);
  
    return paginationRange;
  };


export const Pagination = ({ pages, current_page, sibling_count=2 }: paginationProps) => {

    const DOTS = 0

    const paginationRange = usePagination({ pages, sibling_count, current_page, DOTS })!
    
    const navigate = useNavigate()
    
      if (current_page === 0 || paginationRange.length < 2) {
        return null;
      }
    
      const onNext = () => {
        navigate(`?page=${current_page + 1}`)
        scrollTo({top: 0, left: 0, behavior: 'smooth'})
      };
    
      const onPrevious = () => {
        navigate(`?page=${current_page - 1}`)
        scrollTo({top: 0, left: 0, behavior: 'smooth'})
      };
    
      const lastPage = paginationRange[paginationRange.length - 1];
      return (
        <div>
           
          {current_page !== 1 && (
            <button onClick={onPrevious}>
                <div className="arrow left" />
            </button>
          )}

          {paginationRange.map(pageNumber => {
             
            if (pageNumber === DOTS) {
              return <div key='dot' className="pagination-item dots">&#8230;</div>;
            }
            
            return (
              <button key={pageNumber} 
                onClick={() => {
                    navigate(`?page=${pageNumber}`)
                    scrollTo({top: 0, left: 0, behavior: 'smooth'})
                }}>
                {pageNumber}
              </button>
            );
          })}

          {current_page !== lastPage && (
            <button onClick={onNext}>
                <div className="arrow right" />
            </button>
          )}
        </div>
      );
}
