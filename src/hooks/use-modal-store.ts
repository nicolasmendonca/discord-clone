import { Server } from "@prisma/client"
import { create } from "zustand"

export type ModalType = "initial" | "createServer" | "invite" | "editServer"

interface ModalData {
	server?: Server
}

interface ModalStore {
	type: ModalType | null
	data: ModalData
	isOpen: boolean
	onOpen: (type: ModalType, data?: ModalData) => void
	onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	isOpen: false,
	data: {},
	onOpen: (type: ModalType, data = {}) => set({ type, isOpen: true, data }),
	onClose: () => set({ type: null, isOpen: false, data: {} }),
}))
