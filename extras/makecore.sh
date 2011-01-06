#!/bin/bash

# Creates the core version. Keep this updated!
OUTD="../../akihabara-core-xxx"
DEMOSAUDIO="start select powerup3 laser eat die coin capman-ingame halloffame-theme"

echo Removing older version
rm -rf $OUTD
echo Creating core-version
mkdir $OUTD
echo Copying main root...
for a in $(ls -1 ..|grep -v resources|grep -v akihabara-core-xxx); do
	echo copying $a
	cp -rf "../$a" $OUTD
done
echo Deleting other games except Capman and Hall Of Fame
for a in $(ls -1 $OUTD/game-*|grep -v capman); do
	echo Removing $a;
	rm $a
done
echo Removing unstable stuff...
echo "  Removing AkibaKa..."
rm -rf $OUTD/extras/AkibaKa
echo Removing project stuff...
echo "  Removing this script..."
rm $OUTD/extras/makecore.sh
echo Creating resources
mkdir $OUTD/resources
echo Copying capman resources
cp -rf ../resources/capman $OUTD/resources
echo Copying Hall Of Fame resources
cp -rf ../resources/halloffame $OUTD/resources
echo Copying demos audio
mkdir $OUTD/resources/audio
for a in $DEMOSAUDIO; do
	echo Copying $a...
	cp ../resources/audio/$a.ogg $OUTD/resources/audio
	cp ../resources/audio/$a.mp3 $OUTD/resources/audio
done
echo Done
