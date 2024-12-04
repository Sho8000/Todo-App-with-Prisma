import { PrismaClient } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";

const prisma = new PrismaClient();

//Get TodoList
export const getTodo:RequestHandler = async (req: Request, res: Response) => {
  try {
    const todoList = await prisma.todo.findMany();
    res.render("pages/todo",{todoList:todoList})
  } catch(error) {
    console.error('error here', error);
    res.status(500).json({
      status:'error',
      message:'An error occured while fetching todo.'
    })
  }
}

//POST TodoList
export const postTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  
  try{
    await prisma.todo.create({
      data:{
        title:title
      }
    });
    res.redirect("/api/v1/projects")    
  } catch(error) {
    console.error('error here', error);
    res.status(500).json({
      status:'error',
      message:'An error occured while fetching users.'
    })
  }
}

//Update Todo
export const updateTodo:RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  if( !id ){
    res.status(400).json({
      status:"error",
      message:"param id is required / not found"
    })
  }

  try {
    const todoList = await prisma.todo.update({
      where:{
        id: Number(id),
      },
      data:{
        title:title
      }
    });

    //res.redirect("/api/v1/projects") didn't work for delete and put
//    const todoList = ;
    res.render("pages/todo",{todoList:await prisma.todo.findMany()})

  } catch(error) {
    console.error('error here', error);
    res.status(500).json({
      status:'error',
      message:'An error occured while fetching users.'
    })
  }
}

//Delete Todo
export const deleteTodo:RequestHandler = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where:{
        id: Number(id)  
      }
    });
    //res.redirect("/api/v1/projects") didn't work for delete and put
    const todoList = await prisma.todo.findMany();
    res.render("pages/todo",{todoList:todoList})
  } catch(error) {
    console.error('error here', error);
    res.status(500).json({
      status:'error',
      message:'An error occured while fetching users.'
    })
  }
} 

/* 
export const UpdateTask = async (req: Request, res: Response) => {
  const { title,description } = req.body;
  const { id } = req.params;

  const data = await pool.query<Project>('UPDATE projects SET title = $1, description = $2 WHERE id = $3 RETURNING *;', [title,description,id]);

  console.log(data);

  res.json({
    status: 'ok', 
    message:'Updated values',
    data: data.rows
  });
};

export const DeleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const targetValue = await pool.query<Project>('SELECT * FROM projects WHERE id = $1;',[id]);
  if(!targetValue.rows[0]){
    res.status(404).json({
      error:404,
      message:`Record with id${id} does not exist`
    });
  }

  const data = await pool.query(
    'DELETE FROM projects WHERE id = $1 RETURNING *;', [id]);

  console.log(data);

  res.json({
    status: 'ok', 
    message:'Deleted id #' +id,
    data: data.rows
  });
};
 */