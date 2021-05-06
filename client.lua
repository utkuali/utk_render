local inCam = false
local frontCam = false

function CellFrontCamActivate(activate, ana)
	return Citizen.InvokeNative(0x2491A93618B7D838, activate)
end

RegisterCommand("render", function()
    CreateMobilePhone(1)
    CellCamActivate(true, true)
    inCam = true
    SendNUIMessage({msg = "render"})
    while inCam do
        Citizen.Wait(0)
        if inCam then
            if IsControlJustPressed(1, 27) then -- Toogle Mode
                frontCam = not frontCam
                CellFrontCamActivate(frontCam)
            elseif IsControlJustPressed(1, 25) then -- CANCEL
                SendNUIMessage({msg = "stop"})
                DestroyMobilePhone()
                CellCamActivate(false, false)
                frontCam = false
                inCam = false
            end
            HideHudComponentThisFrame(7)
            HideHudComponentThisFrame(8)
            HideHudComponentThisFrame(9)
            HideHudComponentThisFrame(6)
            HideHudComponentThisFrame(19)
            HideHudAndRadarThisFrame()
        end
    end
end)

-- RegisterCommand("ss", function()
--     SendNUIMessage({msg = "screenshot"})
-- end)