import React, { useState } from "react";
import { X } from "lucide-react";

export interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate: string;
    assignedTo: string;
  }) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }
    if (!assignedTo.trim()) {
      setError("Assignee name is required");
      return;
    }

    onSave({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setAssignedTo("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#060814]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="glass-panel w-full max-w-lg rounded-2xl border border-darkBorder/60 shadow-2xl relative z-10 overflow-hidden transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-5 border-b border-darkBorder/30 bg-darkCard/50">
          <h3 className="text-base font-semibold text-gray-100">Create New Task</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 p-1.5 rounded-lg hover:bg-darkBorder/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design meeting slides"
              className="w-full bg-[#0d1322] border border-darkBorder/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the meeting action item..."
              rows={3}
              className="w-full bg-[#0d1322] border border-darkBorder/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Assignee <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assignee name"
                className="w-full bg-[#0d1322] border border-darkBorder/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-[#0d1322] border border-darkBorder/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["low", "medium", "high"] as const).map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setPriority(prio)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider capitalize border transition-all duration-200 ${
                    priority === prio
                      ? prio === "high"
                        ? "bg-red-500/10 text-red-400 border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.1)]"
                        : prio === "medium"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.1)]"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                      : "bg-[#0d1322] text-gray-400 border-darkBorder/40 hover:bg-[#12192d]"
                  }`}
                >
                  {prio}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-darkBorder/20 pt-5 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-gray-200 border border-darkBorder/40 hover:bg-darkBorder/20 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
