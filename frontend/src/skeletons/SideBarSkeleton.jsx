import { Users } from 'lucide-react'
import React from 'react'

const SideBarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null)
  return (
    <aside className='h-full w-[20%] lg:w-[40%] border-r-2 border-conatiner flex flex-col transition-all duaration-200'>
        {/* Header */}
        <div className="border-b-2 border-conatiner w-full p-5">
            <div className="flex items-center gap-3">
                <Users className='size-6 text-conatiner'/>
                <span className="font-medium hidden lg:block text-conatiner">Contacts</span>
            </div>
        </div>
        {/* Skeleton contacts */}
        <div className="overflow-y-auto w-full py-3">
            {skeletonContacts.map((_, idx)=>(
                <div className="w-full p-3 flex items-center gap-3" key={idx}>
                    {/* Avatar Section */}
                    <div className="relative mx-auto lg:mx-0 ">
                        <div className="skeleton  size-12 rounded-full "></div>
                    </div>

                    {/* User info skeleton - only visible  on large screen */}

                    <div className="hidden lg:block text-left min-w-0 flex-1 ">
                        <div className="skeleton h-4 w-32 mb-2">
                            <div className="skeleton h-3 w-16">
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </aside>
  )
}

export default SideBarSkeleton