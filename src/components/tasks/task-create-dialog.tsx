import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {TaskForm} from "@/components/forms";

export function TaskDialog({isOpen, toggleDialog} : {isOpen: boolean, toggleDialog: ()=>void}) {
    return (
        <Dialog open={isOpen} onOpenChange={toggleDialog}>
            <DialogContent className={"dark"}>
                <DialogHeader>
                    <DialogTitle>Добавление новой задачи</DialogTitle>
                    <DialogDescription>
                        <TaskForm/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}