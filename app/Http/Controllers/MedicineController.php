<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index()
    {
        return Medicine::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'med_name' => 'required|string',
            'closet' => 'required|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'dose' => 'nullable|string',
            'scientific_name' => 'nullable|string',
            'price' => 'nullable|numeric',
        ]);

        return Medicine::create($data);
    }

    public function update(Request $request, $id)
    {
        $medicine = Medicine::findOrFail($id);

        $data = $request->validate([
            'med_name' => 'sometimes|string',
            'closet' => 'sometimes|string',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'dose' => 'nullable|string',
            'scientific_name' => 'nullable|string',
            'price' => 'nullable|numeric',
        ]);

        $medicine->update($data);

        return response()->json([
            'message' => 'Medicine updated successfully.',
            'medicine' => $medicine
        ], 200);
    }
}
