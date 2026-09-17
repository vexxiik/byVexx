"use client";

import { useEffect, useState } from "react";
import { Lead } from "@prisma/client";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MapPin, Phone, Building2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanBoardProps {
  leads: Lead[];
  onCardClick: (lead: Lead) => void;
  updateStatus: (id: string, newStatus: string) => void;
}

const COLUMNS = [
  { id: "NEW", title: "Nový", headerColor: "bg-blue-100 text-blue-700", dotColor: "bg-blue-500" },
  { id: "CALLED", title: "Zavoláno", headerColor: "bg-yellow-100 text-yellow-700", dotColor: "bg-yellow-500" },
  { id: "NO_ANSWER", title: "Nezvedá", headerColor: "bg-gray-100 text-gray-700", dotColor: "bg-gray-500" },
  { id: "INTERESTED", title: "Zájemce", headerColor: "bg-orange-100 text-orange-700", dotColor: "bg-orange-500" },
  { id: "MEETING", title: "Schůzka", headerColor: "bg-green-100 text-green-700", dotColor: "bg-green-500" },
  { id: "CLOSED", title: "Uzavřeno", headerColor: "bg-purple-100 text-purple-700", dotColor: "bg-purple-500" },
];

export default function KanbanBoard({ leads, onCardClick, updateStatus }: KanbanBoardProps) {
  // To avoid hydration mismatch with dnd libraries
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    updateStatus(draggableId, newStatus);
  };

  if (!mounted) {
    return <div className="min-h-[500px] flex items-center justify-center">Načítám Kanban...</div>;
  }

  return (
    <div className="w-full overflow-x-auto pb-4 snap-x snap-mandatory scroll-p-4 [&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 md:gap-6 min-w-max items-start px-4 md:px-0 pb-2">
          {COLUMNS.map((col) => {
            const columnLeads = leads.filter((l) => l.status === col.id);
            
            return (
              <div key={col.id} className="w-[85vw] md:w-[320px] shrink-0 flex flex-col snap-center">
                <div className="flex items-center justify-between mb-4 px-1">
                  <div className="flex items-center gap-2">
                    <div className={cn("size-2 rounded-full", col.dotColor)} />
                    <h3 className="font-semibold text-gray-900">{col.title}</h3>
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {columnLeads.length}
                  </span>
                </div>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={cn(
                        "bg-gray-50/50 rounded-xl p-3 min-h-[500px] max-h-[65vh] overflow-y-auto overflow-x-hidden transition-colors border border-gray-100/50 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full",
                        snapshot.isDraggingOver ? "bg-gray-100/80 border-gray-200" : ""
                      )}
                    >
                      <div className="flex flex-col gap-3">
                        {columnLeads.map((lead, index) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => onCardClick(lead)}
                                className={cn(
                                  "bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-pointer group transition-all",
                                  snapshot.isDragging ? "shadow-lg scale-[1.02] rotate-1 z-50 border-blue-200" : "hover:border-gray-300 hover:shadow-md"
                                )}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                    {lead.companyName}
                                  </h4>
                                  {lead.email && <span title={`E-mail: ${lead.email}`}><Mail className="size-3.5 text-blue-500 flex-shrink-0 mt-0.5" /></span>}
                                </div>
                                
                                <div className="space-y-1.5 mt-3">
                                  <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                    <MapPin className="size-3.5" />
                                    <span className="truncate">{lead.city}</span>
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500 gap-1.5">
                                    <Phone className="size-3.5" />
                                    <span>{lead.phone}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
