import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

async function main(){
  const todo1 = await prisma.todo.create({
    data:{
      title:"todo1",
      isDone: true
    }
  })
  const todo2 = await prisma.todo.create({
    data:{
      title:"todo2"
    }
  })

  console.log(todo1)
  console.log(todo2)
}

main()
  .catch(e=>{
    console.error(e);
  })
  .finally(async ()=>{
    await prisma.$disconnect();
  })
