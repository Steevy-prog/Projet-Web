<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Employes",
 *     description="API Endpoints for Employee Management"
 * )
 *
 * @OA\Schema(
 *     schema="Employe",
 *     type="object",
 *     title="Employe",
 *     required={"id_utilisateur","poste","date_embauche","salaire","est_actif"},
 *     @OA\Property(property="id_employe", type="integer", example=1),
 *     @OA\Property(property="id_utilisateur", type="integer", example=1),
 *     @OA\Property(property="poste", type="string", example="Développeur Backend"),
 *     @OA\Property(property="date_embauche", type="string", format="date", example="2025-10-20"),
 *     @OA\Property(property="salaire", type="number", example=1200000),
 *     @OA\Property(property="est_actif", type="boolean", example=true)
 * )
 */
class EmployeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/employes",
     *     summary="Get all employees",
     *     description="Returns a list of all employees",
     *     tags={"Employes"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Employe")
     *         )
     *     ),
     *     @OA\Response(response=404, description="No employees found")
     * )
     */
    public function index()
    {
        $employees = Employe::all();
        if ($employees->isEmpty()) {
            return response()->json(['message' => 'No employees found'], 404);
        }
        return response()->json($employees);
    }

    /**
     * @OA\Post(
     *     path="/api/employes",
     *     summary="Create a new employee",
     *     description="Add a new employee to the system",
     *     tags={"Employes"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"id_utilisateur","poste","date_embauche","salaire","est_actif"},
     *             @OA\Property(property="id_utilisateur", type="integer", example=1),
     *             @OA\Property(property="poste", type="string", example="Développeur Backend"),
     *             @OA\Property(property="date_embauche", type="string", format="date", example="2025-10-20"),
     *             @OA\Property(property="salaire", type="number", example=1200000),
     *             @OA\Property(property="est_actif", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Employee created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Employe")
     *     ),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_utilisateur' => 'required|integer|exists:utilisateur,id_utilisateur',
            'poste' => 'required|string|max:255',
            'date_embauche' => 'required|date',
            'salaire' => 'required|numeric',
            'est_actif' => 'required|boolean',
        ]);

        $employe = Employe::create($validated);

        return response()->json([
            'message' => 'Employé créé avec succès',
            'data' => $employe
        ], 201);
    }


    /**
     * @OA\Get(
     *     path="/api/employes/{id}",
     *     summary="Get a single employee by ID",
     *     tags={"Employes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Employee ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Employee found",
     *         @OA\JsonContent(ref="#/components/schemas/Employe")
     *     ),
     *     @OA\Response(response=404, description="Employee not found")
     * )
     */
    public function show($id)
    {
        $employe = Employe::find($id);
        if ($employe) {
            return response()->json($employe);
        }
        return response()->json(['message' => 'Employe not found'], 404);
    }

    /**
     * @OA\Put(
     *     path="/api/employes/{id}",
     *     summary="Update an employee",
     *     tags={"Employes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Employee ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="poste", type="string", example="Développeur Senior"),
     *             @OA\Property(property="date_embauche", type="string", format="date", example="2025-10-21"),
     *             @OA\Property(property="salaire", type="number", example=1500000),
     *             @OA\Property(property="est_actif", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Employee updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Employe")
     *     ),
     *     @OA\Response(response=404, description="Employee not found")
     * )
     */
    public function update(Request $request, $id)
    {
        $employe = Employe::find($id);
        if (!$employe) {
            return response()->json(['message' => 'Employe not found'], 404);
        }

        $employe->update($request->all());
        return response()->json($employe);
    }

    /**
     * @OA\Delete(
     *     path="/api/employes/{id}",
     *     summary="Delete an employee",
     *     tags={"Employes"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="Employee ID",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Employee deleted successfully"),
     *     @OA\Response(response=404, description="Employee not found")
     * )
     */
    public function destroy($id)
    {
        $employe = Employe::find($id);
        if (!$employe) {
            return response()->json(['message' => 'Employe not found'], 404);
        }

        $employe->delete();
        return response()->json(['message' => 'Employe deleted successfully']);
    }
}
