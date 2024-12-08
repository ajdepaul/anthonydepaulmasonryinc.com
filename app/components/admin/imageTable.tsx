'use client';

import BoxTextInput from "@/app/components/boxTextInput";
import ImageBox from "@/app/components/imageBox";
import { Data } from "@/app/util/data";
import Link from "next/link";
import { useState } from "react";
import { IoArrowDown, IoArrowUp, IoEyeOff, IoHome, IoImages } from "react-icons/io5";

type SortableColumn = 'Name' | 'Uploaded' | 'Updated';

type SortMode = {
  column: SortableColumn;
  order: 'asc' | 'desc';
};

const ImageTable: React.FC<{ data: Data }> = ({ data }) => {
  const [sortMode, setSortMode] = useState<SortMode>({ column: 'Updated', order: 'desc' });
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <div className="flex gap-x-2">
        <span>Search:</span>
        <BoxTextInput
          value={search}
          onChange={(e) => { setSearch(e.target.value); }}
        />
      </div>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <td className="underline text-lg">Image</td>
            {
              (['Name', 'Uploaded', 'Updated'] as Array<SortableColumn>).map((column) => (
                <td key={column} className="underline text-lg">
                  <button
                    onClick={() => {
                      if (sortMode.column === column) {
                        setSortMode({ ...sortMode, order: sortMode.order === 'desc' ? 'asc' : 'desc' });
                      } else {
                        setSortMode({ column, order: 'desc' });
                      }
                    }}
                    className="flex items-center gap-1"
                  >
                    <span>{column}</span>
                    {
                      sortMode.column === column && (
                        sortMode.order == 'desc'
                          ? (<span><IoArrowDown /></span>)
                          : (<span><IoArrowUp /></span>)
                      )
                    }
                  </button>
                </td>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(data.images)
              .filter((entry) => search === '' || entry[1].name?.toLowerCase()?.includes(search))
              .sort((a, b) => {
                const aData = sortMode.order === 'desc' ? a[1] : b[1];
                const bData = sortMode.order === 'desc' ? b[1] : a[1];
                switch (sortMode.column) {
                  case 'Name':
                    if (!aData.name && bData.name) { return 1; }
                    if (aData.name && !bData.name) { return -1; }
                    return (aData.name ?? '').localeCompare(bData.name ?? '');
                  case 'Uploaded': return new Date(bData.dateUploaded).getTime() - new Date(aData.dateUploaded).getTime();
                  case 'Updated': return new Date(bData.lastUpdated).getTime() - new Date(aData.lastUpdated).getTime();
                }
              })
              .map(([id, imageData]) => {
                const dateUploaded = new Date(imageData.dateUploaded);
                const lastUpdated = new Date(imageData.lastUpdated);
                const isFeatured = data.featuredImages.includes(id);
                const isPublished = data.publishedImages.includes(id);
                const href = `/admin/image/${id}`;
                return (
                  <tr key={id} className='odd:bg-theme-light-gray/50 hover:bg-theme-gold/50'>
                    {/* image */}
                    <td className="h-48">
                      <Link href={href} className="w-full h-full p-4 flex flex-col gap-y-2">
                        <ImageBox
                          src={`/images/${imageData.filename}`}
                          alt={`'${imageData.filename}' image preview`}
                          placeholder={imageData.placeholder}
                          className="grow"
                        />
                        <div className="flex justify-center gap-2">
                          {isFeatured && (<IoHome className="text-lg" />)}
                          {isPublished && (<IoImages className="text-lg" />)}
                          {!isFeatured && !isPublished && (<IoEyeOff className="text-lg text-theme-dark-gray/40" />)}
                        </div>
                      </Link>
                    </td>
                    {/* name */}
                    <td className="h-48"><Link href={href} className="block w-full h-full truncate pr-4">{imageData.name}</Link></td>
                    {/* date uploaded */}
                    <td className="h-48">
                      <Link href={href} className="block w-full h-full">
                        <div>{dateUploaded.toLocaleDateString()}</div>
                        <div>{dateUploaded.toLocaleTimeString()}</div>
                      </Link>
                    </td>
                    {/* last updated */}
                    <td className="h-48">
                      <Link href={href} className="block w-full h-full">
                        <div>{lastUpdated.toLocaleDateString()}</div>
                        <div>{lastUpdated.toLocaleTimeString()}</div>
                      </Link>
                    </td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    </>
  );
};

export default ImageTable;
