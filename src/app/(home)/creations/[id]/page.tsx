
const CreationPage = ({ params }: { params: { id: string }}) => {
  console.log(params.id)
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      hola mundo
    </div>
  )
}

export default CreationPage