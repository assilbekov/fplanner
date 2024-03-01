import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

type InfoCardProps = {
  title: string
  value: string
  editDialog: React.ReactNode
  description: string;
}

export function InfoCard(props: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-3 pr-3">
        <CardTitle className="text-sm font-medium">
          {props.title}
        </CardTitle>
        {props.editDialog}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="text-xs text-muted-foreground">
          {props.description}
        </p>
      </CardContent>
    </Card>
  )
}