document.getElementById("nMeetingBtn").addEventListener("click", () => {
    document.getElementById("isNormalMeeting").style.display = "block";
    document.getElementById("finalAgendaOptions").style.display = "block";
    document.getElementById("meetingKind").value = "isNormal";
    document.getElementById("btn-agenda").disabled = false;
    document.getElementById("nMeetingBtn").classList.add("btn-active");
    document.getElementById("fMeetingBtn").classList.remove("btn-active");
});

document.getElementById("fMeetingBtn").addEventListener("click", () => {
    document.getElementById("isNormalMeeting").style.display = "none";
    document.getElementById("finalAgendaOptions").style.display = "block";
    document.getElementById("meetingKind").value = "isFast";
    document.getElementById("btn-agenda").disabled = false;
    document.getElementById("nMeetingBtn").classList.remove("btn-active");
    document.getElementById("fMeetingBtn").classList.add("btn-active");
});